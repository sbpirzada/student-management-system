#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Define the Student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to view a student's balance
    view_balance() {
        console.log(chalk.italic.grey(`\n \tBalance for ${this.name}: ${this.balance}\n`));
    }
    // Method to pay student's fee
    pay_fee(amount) {
        this.balance -= amount;
        console.log(chalk.bold.cyan(`\n \t${amount} Fee paid successfully for ${this.name}\n`));
    }
    //Method to display student's status
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
//Defining a Student_manager class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        const student = new Student(name);
        this.students.push(student);
        console.log(chalk.italic.blue(`\n \tStudent: ${name} added successfully, Student ID: ${student.id}\n`));
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        const student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.italic.whiteBright(`\n \t${student.name} enrolled in ${course} successfully\n`));
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        const student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.italic.yellowBright("\n \tStudent not found. Please enter a correct ID\n"));
        }
    }
    // Method to pay a student fee
    pay_student_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
        }
        else {
            console.log(chalk.italic.magenta("\n \tStudent not found. Please enter a correct Student ID.\n"));
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student_id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    console.log(chalk.bold.yellow("\n \tWelcome to Shah Bano Pirzada - Student Management System"));
    console.log(`\t ${"-".repeat(50)}`);
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option:",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fee",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.bold.yellowBright("Enter a Student Name:"),
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.yellowBright("Enter a Student ID:"),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.bold.yellowBright("Enter a Course Name:"),
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.yellowBright("Enter a Student ID:"),
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fee":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.yellowBright("Enter a Student ID:")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.bold.yellowBright("Enter the amount to pay:")
                    }
                ]);
                student_manager.pay_student_fee(fee_input.student_id, fee_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.yellowBright("Enter a Student ID:")
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main();
