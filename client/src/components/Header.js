import {
    Link
} from "react-router-dom"

function Header(props) {
    const { setLoaded } = props
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/' onClick={() => setLoaded(false)}>
                        <h1>My Thoughts:</h1>
                    </Link>

                </li>
                <li>
                    <button>Sign In</button>
                </li>
            </ul>
        </nav>
    );
}

export default Header;