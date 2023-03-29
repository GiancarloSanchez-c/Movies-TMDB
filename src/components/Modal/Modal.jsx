import { useEffect, useState } from "react";
import './Modal.scss';

export const Modal = ({active, id, children}) => {


  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    setModalActive(active);
  }, [active]);

  return (
    <div id={id} className={`modal ${modalActive ? 'active' : ''}`}>
      {children}
    </div>
  )
};
