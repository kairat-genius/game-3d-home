import './Settings.css';
import { useDispatch, useSelector } from "react-redux";
import { setWinter } from "@/features/slice/winter/winterSlice";
import { setVolume, toggleMusic } from "@/features/slice/music/musicSettingsSlice"; // Импортируем actions

const Settings = () => {
    const dispatch = useDispatch();
    const winterSnow = useSelector((state) => state.winter.snow);
    const { volume, isMusicEnabled } = useSelector((state) => state.musicSettings); // Получаем состояние музыки

    const toggleSnow = () => {
        dispatch(setWinter(!winterSnow));
    };

    const toggleMusicHandler = () => {
        dispatch(toggleMusic()); // Включение/выключение музыки
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        dispatch(setVolume(newVolume)); // Установка громкости
    };

    return (
        <div className="settings-container">
            {/* Управление снегом */}
            <div className="setting-item">
                <label className="switch">
                    <input type="checkbox" checked={winterSnow} onChange={toggleSnow} />
                    <span className="slider round"></span>
                </label>
                <span>Снег {winterSnow ? "включен" : "выключен"}</span>
            </div>

            {/* Управление музыкой */}
            <div className="setting-item">
                <label className="switch">
                    <input type="checkbox" checked={isMusicEnabled} onChange={toggleMusicHandler} />
                    <span className="slider round"></span>
                </label>
                <span>Музыка {isMusicEnabled ? "включена" : "выключена"}</span>
            </div>

            {/* Управление громкостью */}
            <div className="setting-item">
                <label>
                    Громкость музыки:
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <span>{Math.round(volume * 100)}%</span>
                </label>
            </div>
        </div>
    );
};

export default Settings;