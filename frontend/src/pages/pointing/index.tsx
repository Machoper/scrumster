import _ from "lodash";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { Col, message, Row } from "antd";
import { actionCreators } from "./store";
import RoomForm from "../../common/forms/RoomForm";
import FormModal from "../../common/modal/FormModal";
import { UserPane, PrimaryPane } from "./components";
import { useParams } from "react-router-dom";
import { RoomFormType } from "../../common/forms/RoomFormType.enum";
import Lobby from "../../common/lobby";

const Pointing = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const [visible, setVisible] = useState(!!roomId);
  const [formType, setFormType] = useState(RoomFormType.JOIN_ROOM_AUTO);

  const socket = useRef<Socket>();

  const { currentUser } = useSelector((state: any) => ({
    currentUser: state.getIn(["pointing", "currentUser"]).toJS()
  }));

  const dispatch = useDispatch();

  const joinRoom = (values: any) => {
    const rid =
      formType === RoomFormType.CREATE_ROOM
        ? undefined
        : values.roomId || roomId;
    socket.current?.emit('join', { ...values, roomId: rid })
  };

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_ENDPOINT!, {
        transports: ['websocket', 'polling'],
        path: '/socket/pointing'
    });
    socket.current?.on('refresh', (data: any) => {
        dispatch(actionCreators.updateRoom(data));
    }).on('joined', ({ user, room }: any) => {
        dispatch(actionCreators.updateCurrentUser(user));
        dispatch(actionCreators.setRoomInfo(room));
        window.history.replaceState(null, '', `/pointing/${room.id}`);
    }).on('error', (msg: string) => message.error(msg))
    // if (!_.isEmpty(currentUser)) {
    // 	socket.current?.emit('join', {...currentUser})
    // }
    dispatch(actionCreators.setSocket(socket));
    return () => {
        socket.current?.disconnect();
        dispatch(actionCreators.cleanUp());
    }
  }, []);

  return (
    <Fragment>
      {currentUser.id ? (
        <Row gutter={32} className="animate__animated animate__fadeIn">
          <Col span={6}>
            <UserPane />
          </Col>
          <Col span={18}>
            <PrimaryPane />
          </Col>
        </Row>
      ) : (
        <Lobby
          onCreateRoom={() => {
            setFormType(RoomFormType.CREATE_ROOM);
            setVisible(true);
          }}
          onJoinRoom={() => {
            setFormType(RoomFormType.JOIN_ROOM);
            setVisible(true);
          }}
        />
      )}
      <FormModal
        title="Join Pointing Room"
        visible={visible}
        onSubmit={values => {
          joinRoom(values);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        getContent={() => <RoomForm formType={formType} />}
        initialValues={{ userType: "player" }}
      />
    </Fragment>
  );
};

export default Pointing;
