//Task 23 - The class Employees manages the payment system by letting the user know
//the total payment the employee is owed and how it came to its conclusion.  
class Employees {

    //All instances are stored in this array in order to easily go through each object at the 
    //end of the program.
    static employeesDetails = [];

    //There are 6 properties needed for each intance the name of the employee, their current monthly
    //adjustable salary(only the salaries that are increased according to the task.), the sale target,
    //the successful sales, additional hours worked and the type of employee i.e. salaried, hourly or hybrid.
    constructor (employeeName, currentSalary, salesTarget, successfulSales, additionalHours, employeeType) {
        this.employeeName = employeeName;
        this.currentSalary = currentSalary;
        this.salesTarget = salesTarget;
        this.successfulSales = successfulSales;
        this.additionalHours = additionalHours;
        this.employeeType = employeeType;

        //When called the method checks to see if the employee has met their target and will
        //call a second method depending on whether they have passed their target or failed.
        this.payout = function() {
            if(this.successfulSales >= this.salesTarget){

                //Here to add a space above the output.
                console.log("");

                //The information from the properties are taken directly from the instance
                //and passed into the method.
                Employees.salesTargetMet(this.employeeName, this.employeeType, 
                this.currentSalary, this.additionalHours);

                //Added to remove the undefined statement and add a line at the end of the
                //output.
                return "";
            }
            else {
                //Here to add a space above the output.
                console.log("");

                //If the sales target isn't met this method is called.
                Employees.salesTargetFailed(this.employeeName, this.employeeType, 
                this.currentSalary, this.additionalHours);

                //Added to remove the undefined statement and add a line at the end of the
                //output.
                return "";
            }
        }

        //Used to push the instance into the array.
        Employees.employeesDetails.push(this);
    }

    //If the sales target is met this method is called. The output is designed to work with all
    //different types of employee providing the name, salary, type of employee and how 
    //there salary has changed depending whether they are per hour or have a salary.
    static salesTargetMet(name, type, salary, hours) {

        //Provides an array that contains the % of the salary increase and the strings 
        //to help differentiate the message depending on the type of employee.
        let increaseScale = Employees.salaryIncrease(type);

        //Calculates the new salary based on the first item found in the array
        //from the above variable.
        let newSalary = salary + (salary * increaseScale[0]);

        //The message alters a number of the inputs from lowering cases, to calculating
        //percentages, returning the calculations to 2dp and inputting strings to let the 
        //user know if it is the base or per hour salary.
        console.log(`Our '${type.toLowerCase()}' employee '${name}' has met our sales` + 
        ` target and their current ${increaseScale[1]} salery of £${(salary).toFixed(2)}\nwill increase` +
        ` by ${increaseScale[0] * 100}% (£${(salary * increaseScale[0]).toFixed(2)}) to ` + 
        `£${(newSalary).toFixed(2)}.\n`);

        //This method uses the information called, altered or unused in this section to provide the 
        //second message to let the user know the payment that will need to be paid this month.
        Employees.formulaUsed(type, newSalary, hours, increaseScale);
    }

    //This method is called if the employee has failed to meet their target and designed to work
    //with all different employee types.
    static salesTargetFailed(name, type, salary, hours){

        //Although the salaries won't be increased in this method the strings to 
        //help differentiate the messages are used.
        let increaseScale = Employees.salaryIncrease(type);

        //This message will provide the name, type of employee and lets the user know that the
        //salaries won't be increased this month.
        console.log(`Our '${type.toLowerCase()}' employee '${name}' has failed to meet our sales` + 
        ` target and their current ${increaseScale[1]} salary\nof ` +
        `£${(salary).toFixed(2)} will not be increased until next month.\n`);

        //This method uses the information called, altered or unused in this section to provide the 
        //second message to let the user know the payment that will need to be paid this month.
        Employees.formulaUsed(type, salary, hours, increaseScale);
    }

    //This method is used to provide the percentage calculation and message strings for the 
    //specified employee type.
    static salaryIncrease(type) {
        if (type == "Salaried") {
            return [0.1, "base"];
        }
        else if (type == "Hourly") {
            return [0.5, "per hour"];
        }
        else if (type == "Hybrid") {
            //The third array item is the base salary that is fixed but required to
            //calculate the total salary.
            return [0.2, "per hour", 1041];
        }
    }

    //Provides the total salary owed this month and how it came to the price. As this 
    //is required whether the employee meets the sales target or not it is called in
    //either case.
    static formulaUsed(type, newSalary, hours, increaseScale){

        //Returns either the new salary or the current salary for the salaried employees.
        if(type == "Salaried") {
            console.log(`The total to be paid is the base salary of '£${newSalary.toFixed(2)}' this month.`);
        }

        //Uses the additionalhours value passed on from the methods to calculate how many hours of
        //work the employee has done and multiplied by their hourly salary (either the new salary or old salary) 
        //to retrieve the final value. 
        else if (type == "Hourly") {
            console.log(`The £${newSalary.toFixed(2)} multiplied by the ${hours} hours worked ` + 
            `will bring the total to '£${((newSalary * hours)).toFixed(2)}' to be paid this month.`);
        }

        //Uses the additionalhours value passed on from the methods to calculate how many hours of
        //work the employee has done and multiplied by their hourly salary (either the new salary or old salary) 
        //and adds it to their base salary to retrieve the final value.
        else if (type == "Hybrid") {
            console.log(`The £${newSalary.toFixed(2)} multiplied by the ${hours} hours worked & ` +
            `added to the base salary of £${increaseScale[2]} will bring the total to ` + 
            `\n'£${((newSalary * hours) + increaseScale[2]).toFixed(2)}' this month.`);
        }
    }
}

//6 instances of the Employees class, 2 of each type of employee and with 1 succeeding/failing
//to meet their targets. 
//1. The first parameter contains the name of the employee.
//2. The second contains the base salary if salaried or per hour for the rest.
//3. The sales target for the employee.
//4. The sales the employee has managed.
//5. Additional hours worked, 0 if salaried.
//6. Whether the employee is salaried, hourly or a hybrid.
let employee1 = new Employees("John", 1041, 300, 280, 0, "Salaried"); 
let employee2 = new Employees("Tom", 1041, 450, 512, 0, "Salaried"); 
let employee3 = new Employees("James", 12.50, 100, 50, 27, "Hourly"); 
let employee4 = new Employees("Michael", 13.50, 150, 350, 49, "Hourly"); 
let employee5 = new Employees("Robin", 10.90, 500, 344, 32, "Hybrid"); 
let employee6 = new Employees("Leonard", 9.99, 425, 432, 6, "Hybrid"); 

//The loop goes through each instance and calls the payment method using the employeesDetails array
//to calculate the number of loops.
for (i = 0; i < Employees.employeesDetails.length; i++) {
    
    //Returns the payment method output of each instance.
    console.log(Employees.employeesDetails[i].payout());

    //Helps to seperate each instance from one another by making it clear where one ends and
    //another begins.
    console.log("------------------------------------------------------------------------------");
}
