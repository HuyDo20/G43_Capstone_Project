import { Button, Card, Table, Typography } from "antd";

export default function NotiManagementPage() {

  

  const handleCreateNoti = () => {
    console.log('create noti');
  }

  const fetchNoti = () => {

  }

  return (
    <div className="notification-page h-full">
        <Typography.Title level={2} className="text-center">Notification</Typography.Title>
        <section className="notification-content h-full">
            <div className="notication-content__action flex justify-end mb-3">
                <Button 
                  type="primary" 
                  className=""
                  onClick={handleCreateNoti}
                >
                  Create new notification
                </Button>
            </div>
            <Table className="notication-content__list">
                
            </Table>
        </section>
    </div>
  );
}
