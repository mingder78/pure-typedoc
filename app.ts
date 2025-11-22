import { ScientificCalculator, Calculator } from '@yourorg/pure-typedoc';
import Todo from '@yourorg/pure-typedoc/Todo';
import User from '@yourorg/pure-typedoc/User';

const sci = new ScientificCalculator();
console.log(sci instanceof ScientificCalculator); // true
console.log(sci instanceof Calculator);           // true
// Example usage
const user = new Todo(1, 'Sample Todo', 'This is a sample todo item.', false);
console.log(user);

// Example usage
const newUser = new User(1, 'john_doe');
newUser.addTodo(user);
console.log(newUser.getTodos());
console.log(newUser)
