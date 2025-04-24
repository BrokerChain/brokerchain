// initialized by dev/system

// import {  } from "../../export.page.js";

export interface Content {
    data: {
        info: Node;
        network: {
            node_list: Node[];
        };
        mining: {
            status: string;
            shard_id: string;
            parent_block_hash: string;
            miner_account_address: string;
        };
        pool: {
            transaction_list: Transaction[];
        };
        chain: {
            shard_list: Shard[];
        };
        world_state: WorldState & {
            block_height: number;
        };
    };
}

export interface Node {
    id: string;
    address: string;
    port: number;
    type: string;
    network_id: string;
    chain_id: string;
    shard_id: string;
    block_height: number;
    created_at: string;
    updated_at: string;
}

export interface Block {
    shard_id: string;
    parent_block_hash: string;
    hash: string;
    transaction_list: Transaction[];
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: string;
    shard_id: string;
    parent_block_hash: string;
    type: string;
    from_address: string;
    to_address: string;
    amount: number;
    data?: {
        [key: string]: any;
    };
    created_at: string;
    updated_at: string;
}

export interface Account {
    shard_id: string;
    address: string;
    balance: number;
    created_at: string;
    updated_at: string;
}

export interface Contract {
    shard_id: string;
    address: string;
    balance: number;
    code: string;
    owner_account_address: string;
    created_at: string;
    updated_at: string;
}

export interface Shard {
    id: string;
    block_list: Block[];
    world_state: WorldState;
    created_at: string;
    updated_at: string;
}

export interface WorldState {
    account_list: Account[];
    contract_list: Contract[];
}
