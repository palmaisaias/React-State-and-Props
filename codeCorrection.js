// class UserProfile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { name: 'Alex' };
//     }

//     // Incorrect function
//     changeName() {
//         this.state.name = 'Charlie';
//     }

//     render() {
//         return (
//             <div>
//                 <h1>User Profile</h1>
//                 <p>Name: {this.state.name}</p>
//                 <button onClick={this.changeName}>Change Name</button>
//             </div>
//         );
//     }
// }

// The reason the code snippet is incorrect is because the code directly changes the state which is not proper React practice.
// We should use a method to essentially create a new version of the state as opposed to changing the original directly. Doing this
// also re renders the component using the updated state.

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'Alex' };
    }

    changeName() {
        this.setState({name:'Charlie'}); 
    }

    render() {
        return (
            <div>
                <h1>User Profile</h1>
                <p>Name: {this.state.name}</p>
                <button onClick={this.changeName}>Change Name</button>
            </div>
        );
    }
}