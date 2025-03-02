import './TouchControls.css';
import { useDispatch } from 'react-redux';
import { setForward, setBackward, setLeft, setRight } from '@/features/slice/player/controlsSlice';

const TouchControls = () => {
    const dispatch = useDispatch();

    const handlePointer = (action, isActive) => (e) => {
        e.preventDefault(); // Важно для предотвращения выделения текста
        dispatch(action(isActive));
    };

    return (
        <div className="touch-controls">
            <div className="control-top">
                <button
                    className="control-btn"
                    onPointerDown={handlePointer(setForward, true)}
                    onPointerUp={handlePointer(setForward, false)}
                    onPointerLeave={handlePointer(setForward, false)}
                >
                    ↑
                </button>
            </div>
            <div className="control-bottom">
                <button
                    className="control-btn"
                    onPointerDown={handlePointer(setLeft, true)}
                    onPointerUp={handlePointer(setLeft, false)}
                    onPointerLeave={handlePointer(setLeft, false)}
                >
                    ←
                </button>
                <button
                    className="control-btn"
                    onPointerDown={handlePointer(setBackward, true)}
                    onPointerUp={handlePointer(setBackward, false)}
                    onPointerLeave={handlePointer(setBackward, false)}
                >
                    ↓
                </button>
                <button
                    className="control-btn"
                    onPointerDown={handlePointer(setRight, true)}
                    onPointerUp={handlePointer(setRight, false)}
                    onPointerLeave={handlePointer(setRight, false)}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default TouchControls;