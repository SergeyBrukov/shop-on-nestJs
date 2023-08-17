import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import {renderRoutersBlock} from "../../utils/customFunk/renderRoutersBlock";
import SuspenseWrapper from "./SuspenseWrapper";
import {useAppSelector} from "../../app/hooks";

const RoutersBlock = () => {
  const token = useAppSelector(store => store.userSlice.token);

  const routers = renderRoutersBlock(!!token);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {!token && <Route path="/" element={<Navigate to="/login" />} />}
        {token && <Route path="/:lng?/login" element={<Navigate to="/" />} />}
        {token && <Route path="/:lng?/register" element={<Navigate to="/" />} />}
        {routers.map(({path, element}) => (
          <Route key={path} path={path} element={<SuspenseWrapper path={element} />} />
        ))}
      </Route>
    </Routes>
  );
};

export default RoutersBlock;