//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract Factory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) external {
        address newCampaign = address(new CrowdFunding(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() external view returns (address[] memory){
        return deployedCampaigns;
    }
}

contract CrowdFunding {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(uint => mapping(address => bool)) approved;
    uint public approversCount;


    modifier restricted() {
        require(msg.sender == manager, "Not Authorized");
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() external payable {
        require(msg.value > minimumContribution, "Does not satisfy minimum contribution");
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string calldata _description, uint _value, address payable _recipient) external restricted {
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            recipient: _recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) external {
        require(approvers[msg.sender], "Not An Approver");
        require(!approved[index][msg.sender], "Already Approved");

        approved[index][msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequest(uint index) external restricted {

        Request storage request = requests[index];


        require(request.approvalCount > approversCount/2, "Not enough approval");
        require(!request.complete, "Already Finalized");

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}