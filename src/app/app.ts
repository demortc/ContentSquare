import { Controller } from "../components/controller";


let args = process.argv;

try {
    Controller.start(args[2]);
} catch (e) {
    console.error(e.message);
}