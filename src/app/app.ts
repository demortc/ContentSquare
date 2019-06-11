import { Controller } from "../components/controller";

const args = process.argv;

if (process.argv.length === 3) {
    Controller.start(args[2]).catch((error) => console.error(error.message));
} else {
    console.log("Usage: content-square <config file path>");
}
