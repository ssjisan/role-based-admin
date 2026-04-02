import PropTypes from "prop-types";

export const Page = ({ color, size }) => {
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
        <path
          opacity="0.4"
          d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
          fill={color}
        />
        <path
          d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z"
          fill={color}
        />
        <path
          d="M13.5 13.75H7.5C7.09 13.75 6.75 13.41 6.75 13C6.75 12.59 7.09 12.25 7.5 12.25H13.5C13.91 12.25 14.25 12.59 14.25 13C14.25 13.41 13.91 13.75 13.5 13.75Z"
          fill={color}
        />
        <path
          d="M11.5 17.75H7.5C7.09 17.75 6.75 17.41 6.75 17C6.75 16.59 7.09 16.25 7.5 16.25H11.5C11.91 16.25 12.25 16.59 12.25 17C12.25 17.41 11.91 17.75 11.5 17.75Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
export const PageGroup = ({ color, size }) => {
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
        <path
          opacity="0.4"
          d="M15.5 13.15H13.33C11.55 13.15 10.1 11.71 10.1 9.92V7.75C10.1 7.34 9.77 7 9.35 7H6.18C3.87 7 2 8.5 2 11.18V17.82C2 20.5 3.87 22 6.18 22H12.07C14.38 22 16.25 20.5 16.25 17.82V13.9C16.25 13.48 15.91 13.15 15.5 13.15Z"
          fill={color}
        />
        <path
          d="M17.8198 2H15.8498H14.7598H11.9298C9.66977 2 7.83977 3.44 7.75977 6.01C7.81977 6.01 7.86977 6 7.92977 6H10.7598H11.8498H13.8198C16.1298 6 17.9998 7.5 17.9998 10.18V12.15V14.86V16.83C17.9998 16.89 17.9898 16.94 17.9898 16.99C20.2198 16.92 21.9998 15.44 21.9998 12.83V10.86V8.15V6.18C21.9998 3.5 20.1298 2 17.8198 2Z"
          fill={color}
        />
        <path
          d="M11.9806 7.15024C11.6706 6.84024 11.1406 7.05024 11.1406 7.48024V10.1002C11.1406 11.2002 12.0706 12.1002 13.2106 12.1002C13.9206 12.1102 14.9106 12.1102 15.7606 12.1102C16.1906 12.1102 16.4106 11.6102 16.1106 11.3102C15.0206 10.2202 13.0806 8.27024 11.9806 7.15024Z"
          fill={color}
        />
        <path
          d="M10.4 15H5.6C5.272 15 5 14.7733 5 14.5C5 14.2267 5.272 14 5.6 14H10.4C10.728 14 11 14.2267 11 14.5C11 14.7733 10.728 15 10.4 15Z"
          fill={color}
        />
        <path
          d="M8.45455 18H5.54545C5.24727 18 5 17.7733 5 17.5C5 17.2267 5.24727 17 5.54545 17H8.45455C8.75273 17 9 17.2267 9 17.5C9 17.7733 8.75273 18 8.45455 18Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

Page.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
PageGroup.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
