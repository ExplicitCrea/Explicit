// Desc: Video player component
// Usage: <Player video={video} />
import PropTypes from 'prop-types';

export const Player = ({ video, plus_class }) => {
    return (
        <video autoPlay playsInline muted loop className={'video' + (plus_class? " "+plus_class : '')}>
            <source src={video} type="video/mp4"></source>
        </video>
    );
};

Player.propTypes = {
    video: PropTypes.string.isRequired,
    plus_class: PropTypes.string
}