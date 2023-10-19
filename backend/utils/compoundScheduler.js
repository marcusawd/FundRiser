const schedule = require("node-schedule");
const debug = require("debug")("backend:compoundScheduler");

function performCompounding() {
	// Logic to retrieve user balances and perform the compounding process
	// Example: calculateCompoundedAmount(lastCompoundedDate, lastDepositDate, currentBalance, newDeposits);
	debug("Compounding process triggered for all users");
}

// Every 10 minutes
const compoundJob = schedule.scheduleJob("* */10 * * * *", () => {
	performCompounding();
});
