import { getMyBookings } from "@/api/booking";
import { Button, Card, Table } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ListBooking = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getListBooking = useCallback(async () => {
    const res = (await getMyBookings()) as any;
    setData(res?.bookings);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Khung giờ",
      dataIndex: "time",
    },
    {
      title: "Thời lượng",
      dataIndex: "hour",
      render: (hour: any) => <div>{+hour} giờ</div>,
    },
    {
      title: "Ngày đặt lịch",
      dataIndex: "date",
      render: (date: any) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "status_payment",
      render: (status_payment: string) => (
        <div className="uppercase font-semibold">{status_payment}</div>
      ),
    },
  ];
  useEffect(() => {
    getListBooking();
  }, []);
  return (
    <Card title="Lịch đã đặt">
      <Button className="mb-32" type="default" onClick={() => navigate('/')}>Quay lại</Button>
      <Table
        rowKey={"id"}
        bordered
        dataSource={data}
        columns={columns}
        scroll={{ y: 500, x: 150 * columns?.length }}
        // pagination={{
        //   current: pagination.page,
        //   pageSize: pagination.size,
        //   total: totalElement,
        //   showSizeChanger: false,
        //   onChange: onChangePage,
        // }}
      />
    </Card>
  );
};
