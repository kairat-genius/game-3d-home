
const ResourcesUI = ({ resources }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '12px 24px',
            borderRadius: '8px',
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            fontFamily: '"Minecraft", sans-serif',
            color: 'white',
            fontSize: '20px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🌳</span>
                <span>{resources.wood}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>⛏️</span>
                <span>{resources.stone}</span>
            </div>
        </div>
    );
};


export default ResourcesUI;