// initialized by dev/system

import { Record, Content, Node, WorldState, Account, Contract, Shard, Block, Transaction } from "../type/index.js";
// import {  } from "../../export.page.js";

// wrap the immutable factory function because:
// - avoid import cycle problem
//     import a function and invoke it immediately cause the problem
//     wrap the logic in function will not cause the problem (because the invoke is delayed)
// - easier to customize the empty value

export function empty() {
    const fun = Record<Content>({
        data: {
            info: {
                id: "",
                address: "",
                port: 0,
                type: "",
                network_id: "",
                chain_id: "",
                shard_id: "",
                block_height: 0,
                created_at: "",
                updated_at: ""
            },
            network: {
                node_list: [make_node(), make_node()]
            },
            mining: {
                status: "",
                shard_id: "",
                parent_block_hash: "",
                miner_account_address: ""
            },
            pool: {
                transaction_list: [make_transaction(), make_transaction(), make_transaction()]
            },
            chain: {
                shard_list: [make_shard(), make_shard(), make_shard()]
            },
            world_state: {
                block_height: 0,
                ...make_world_state()
            }
        }
    });

    return fun();
}

function make_node(): Node {
    return {
        id: "",
        address: "",
        port: 0,
        type: "",
        network_id: "",
        chain_id: "",
        shard_id: "",
        block_height: 0,
        created_at: "",
        updated_at: ""
    };
}

function make_shard(): Shard {
    return {
        id: "",
        block_list: [make_block(), make_block(), make_block()],
        world_state: make_world_state(),
        created_at: "",
        updated_at: ""
    };
}

function make_block(): Block {
    return {
        shard_id: "",
        parent_block_hash: "",
        hash: "",
        transaction_list: [make_transaction(), make_transaction(), make_transaction()],
        created_at: "",
        updated_at: ""
    };
}

function make_transaction(): Transaction {
    return {
        id: "",
        shard_id: "",
        parent_block_hash: "",
        type: "",
        from_address: "",
        to_address: "",
        amount: 0,
        data: undefined, // {},
        created_at: "",
        updated_at: ""
    };
}

function make_world_state(): WorldState {
    return {
        account_list: [make_account(), make_account(), make_account()],
        contract_list: [make_contract(), make_contract(), make_contract()]
    };
}

function make_account(): Account {
    return {
        shard_id: "",
        address: "",
        balance: 0,
        created_at: "",
        updated_at: ""
    };
}

function make_contract(): Contract {
    return {
        shard_id: "",
        address: "",
        balance: 0,
        code: "",
        owner_account_address: "",
        created_at: "",
        updated_at: ""
    };
}
