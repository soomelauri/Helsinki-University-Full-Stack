const Notification = ({ notificationMessage }) => {
    if (!notificationMessage) {
      return null  
    }

    return <div className="message">{ notificationMessage }</div>
}

export default Notification
