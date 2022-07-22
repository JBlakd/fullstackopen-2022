const Notification = ({ notification }) => {
  const normalStyle = {
    color: 'green',
    background: 'lightgrey',
    fontsize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontsize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  // console.log('notification: ', notification)

  if (notification.message === '') {
    return (<></>)
  } else {
    return (
      <div style={notification.isError ? errorStyle : normalStyle}>
        {notification.message}
      </div>
    )
  }
}

export default Notification

