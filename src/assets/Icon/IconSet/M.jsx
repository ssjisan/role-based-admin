import PropTypes from "prop-types";

export const More = ({ color, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="2" fill={color} />
        <circle cx="12" cy="19" r="2" fill={color} />
        <circle cx="12" cy="5" r="2" fill={color} />
      </svg>
    </div>
  );
};

More.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
