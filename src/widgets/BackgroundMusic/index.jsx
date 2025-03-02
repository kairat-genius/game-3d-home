import { useRef } from 'react';
import { useSelector } from 'react-redux';

export function BackgroundMusic() {
    const audioRef = useRef(null);
    const { volume, isMusicEnabled } = useSelector((state) => state.musicSettings);

    // Устанавливаем громкость и состояние воспроизведения
    if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.loop = true;

        if (isMusicEnabled) {
            audioRef.current.play().catch((error) => {
                console.error("Ошибка воспроизведения:", error);
            });
        } else {
            audioRef.current.pause();
        }
    }

    return (
        <audio ref={audioRef} src="/music/11.mp3" loop={true} />
    );
}