import "@stdlib/deploy";
import "@stdlib/ownable";

message Deposit {
    queryId: Int as uint64;
}

message ClaimReward {
    queryId: Int as uint64;
    worker: Address;
    amount: Int as coins;
    taskId: Int as uint64;
}

message WithdrawBalance {
    queryId: Int as uint64;
    amount: Int as coins;
}

struct WorkerStats {
    totalEarned: Int as coins;
    totalTasks: Int as uint32;
    accuracy: Int as uint8;     // 0-100
    lastClaim: Int as uint32;   // unix timestamp
}

contract RewardPool with Deployable, Ownable {
    owner: Address;
    totalDeposited: Int as coins = 0;
    totalDistributed: Int as coins = 0;
    minReward: Int as coins;
    maxReward: Int as coins;

    init(owner: Address, minReward: Int, maxReward: Int) {
        self.owner = owner;
        self.minReward = minReward;
        self.maxReward = maxReward;
    }

    // Owner deposits funds into the reward pool
    receive(msg: Deposit) {
        self.requireOwner();
        let ctx: Context = context();
        self.totalDeposited = self.totalDeposited + ctx.value;
    }

    // Backend claims reward on behalf of a verified worker
    receive(msg: ClaimReward) {
        self.requireOwner();
        require(msg.amount >= self.minReward, "Below minimum reward");
        require(msg.amount <= self.maxReward, "Exceeds maximum reward");
        require(myBalance() > msg.amount + ton("0.05"), "Insufficient pool balance");

        send(SendParameters{
            to: msg.worker,
            value: msg.amount,
            mode: SendPayGasSeparately,
            bounce: true,
            body: "AI Earn reward".asComment()
        });

        self.totalDistributed = self.totalDistributed + msg.amount;
    }

    // Owner can withdraw remaining balance
    receive(msg: WithdrawBalance) {
        self.requireOwner();
        require(msg.amount <= myBalance() - ton("0.1"), "Keep minimum balance");
        send(SendParameters{
            to: self.owner,
            value: msg.amount,
            mode: SendPayGasSeparately,
            bounce: true,
            body: "Pool withdrawal".asComment()
        });
    }

    // Getters
    get fun poolBalance(): Int {
        return myBalance();
    }

    get fun totalDeposited(): Int {
        return self.totalDeposited;
    }

    get fun totalDistributed(): Int {
        return self.totalDistributed;
    }

    get fun rewardRange(): (Int, Int) {
        return (self.minReward, self.maxReward);
    }
}
