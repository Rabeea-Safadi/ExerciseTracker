const PageNotFound = props => {
    return <div className="container">
        <h3>Page Not Found :(</h3>
        <p>We are sure it is strange being here on this side of the web, but don't worry we got you.</p>
        <button className="btn btn-outline-dark" onClick={() => window.location = "/"}>
            Go To Home Page
        </button>
    </div>;
};

export default PageNotFound;