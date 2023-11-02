const schedule = require("node-schedule");


function performCompounding() {
	// Logic to retrieve user balances and perform the compounding process
	// Example: calculateCompoundedAmount(lastCompoundedDate, lastDepositDate, currentBalance, newDeposits);
	const date = new Date();
	debug("Compounding.. ", date);
}

// Every 10 minutes
const compoundJob = schedule.scheduleJob("30 * * * * *", () => {
	performCompounding();
});
