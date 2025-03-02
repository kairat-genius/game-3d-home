import {useState, useEffect} from "react";
import "./Menu.css";
import {HouseListInfo} from "./HouseListInfo";
import Settings from "@/widgets/Settings";
import Save from "@/features/Save";

const Menu = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [gameInfo, setGameInfo] = useState(<div className="game-info">
        <h2>Управление персонажем</h2>
        <ul>
            <li><strong>W</strong> - Движение вперед</li>
            <li><strong>A</strong> - Движение влево</li>
            <li><strong>S</strong> - Движение назад</li>
            <li><strong>D</strong> - Движение вправо</li>
            <li><strong>Пробел</strong> - Прыжок</li>
            <li><strong>ЛКМ (Левая кнопка мыши)</strong> - Сбор ресурсов</li>
        </ul>
        <p>Используйте эти клавиши для управления вашим персонажем в игре.</p>
    </div>);
    const [activeButton, setActiveButton] = useState("info");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("restart")) {
            setIsVisible(false);
            params.delete("restart");
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const handleStart = () => {
        setIsVisible(false);
    };

    const handleOpenMenu = () => {
        setIsVisible(true);
    };

    const handleRestart = () => {
        localStorage.removeItem('gameData');
        window.location.href = window.location.origin + window.location.pathname + "?restart";
    };

    const handleClose = () => {
        setIsVisible(false);
    };


    const handleGameInfo = (type) => {
        switch (type) {
            case "info":
                setGameInfo(<div className="game-info">
                    <h2>Управление персонажем</h2>
                    <ul>
                        <li><strong>W</strong> - Движение вперед</li>
                        <li><strong>A</strong> - Движение влево</li>
                        <li><strong>S</strong> - Движение назад</li>
                        <li><strong>D</strong> - Движение вправо</li>
                        <li><strong>Пробел</strong> - Прыжок</li>
                        <li><strong>ЛКМ (Левая кнопка мыши)</strong> - Сбор ресурсов</li>
                    </ul>
                    <p>Используйте эти клавиши для управления вашим персонажем в игре.</p>
                </div>);
                break;
            case "home":
                setGameInfo(<HouseListInfo/>);
                break;
            case "settings":
                setGameInfo(<Settings/>);
                break;
            default:
                setGameInfo("Что-то пошло не так. Пожалуйста, выберите правильную опцию.");
                break;
        }
        setActiveButton(type);
    };

    return (
        <>
            <div className="menu-title" onClick={handleOpenMenu}>меню</div>
            <div className={`menu-container ${isVisible ? "visible" : "hidden"}`}>
                <button className="close-button" onClick={handleClose}>×</button>
                <div className="menu-layout">
                    <div className="left-block">
                        <h1 className="game-title">Tommy needs a home</h1>
                        <div className="menu-content">
                            <button onClick={handleStart}>Начать</button>
                            <button onClick={handleRestart}>Перезапустить</button>
                            <button onClick={() => handleGameInfo("info")}
                                    className={activeButton === "info" ? "active" : ""}>Управление персонажем
                            </button>
                            <button onClick={() => handleGameInfo("home")}
                                    className={activeButton === "home" ? "active" : ""}>Информация о домах
                            </button>
                            <button onClick={() => handleGameInfo("settings")}
                                    className={activeButton === "settings" ? "active" : ""}>Настройки
                            </button>
                           <Save/>

                        </div>
                    </div>
                    <div className="right-block">
                      {gameInfo}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
