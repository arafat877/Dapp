pragma solidity ^0.4.10;

contract ThirmProtocol {

    address public owner;
    uint256 MAX_LENGTH = 999;
    mapping(address => mapping(string => bool)) roles;
    mapping(address => mapping(string => string)) addressStore;
    mapping(string => uint256) tTokenStore;

    constructor() public {
        owner = msg.sender;
    }

    function assignRole(address entity, string role) public hasRole("admin") {
        roles[entity][role] = true;
    }

    function unassignRole(address entity, string role) public hasRole("admin") {
        if (entity != owner) {
            roles[entity][role] = false;
        }
    }

    function getTToken(string _token) public view returns (uint256) {
        return tTokenStore[_token];
    }

    function setTToken(string _tkn, uint256 _value) public hasRole("admin") {
        tTokenStore[_tkn] = _value;
    }

    function getAddress(address _acct, string _key)
        public
        view
        returns (string)
    {
        return addressStore[_acct][_key];
    }

    function setAddress(string _key, string _value) public {
        require(bytes(_value).length <= MAX_LENGTH);
        addressStore[msg.sender][_key] = _value;
    }

    modifier hasRole(string role) {
        require(
            roles[msg.sender][role] || msg.sender == owner,
            "Not authorized."
        );
        _;
    }
}