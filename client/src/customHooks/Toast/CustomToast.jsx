import Toast from 'react-bootstrap/Toast';

function CustomToast({ title, variant, message, show }) {
  if (!show) return null;

  return (
    <Toast className="d-inline-block m-1" bg={variant}>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
        <small>Just now</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default CustomToast;
