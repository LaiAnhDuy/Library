import { PageRoutes } from "./constant";
import { BrowserRouter as Switch, Routes, Route } from 'react-router-dom'

export const CustomerRoutes = () => {
    return (
        <Switch>
            <Routes>
                {PageRoutes.map((p, index) => {
                    const Element = p.element;
                    return (
                        <Route key={index}
                            path={p.path}
                            element={<Element />}
                        />
                    )
                })}
            </Routes>
        </Switch>
    )
}