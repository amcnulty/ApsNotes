import './CircleButton.scss';

const CircleButton = (props) => (
    <button onClick={props.onClick} className='CircleButton btn btn-primary fs-1 fw-bold position-absolute bottom-0 end-0 m-4'>
        {props.children}
    </button>
);

export default CircleButton;
