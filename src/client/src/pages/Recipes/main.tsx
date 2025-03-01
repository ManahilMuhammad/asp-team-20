import { Outlet } from "react-router-dom";

const RecipePage = () => {
    return <>
        {/* <h2>Recipe Page</h2> */}
        {/* Possible to add a navbar or menu to navigate between the subroutes */}
        <Outlet />
    </>;
};

export default RecipePage;
