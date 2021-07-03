import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DetailPage = (props) => {
  const { user } = useSelector((store) => store);
  const { isLogin } = useSelector((store) => store);

  //console.log(1, props);
  //console.log("detail");

  let { match } = props;
  //console.log(1, match);
  let id = match.params.id;

  //console.log(2, id);

  const [detail, setDetail] = useState([]);

  const getDetail = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:8888/post/" + id,
    }).then((res) => {
      //console.log(res);
      setDetail(res.data.data);
    });
  };
  // console.log(3, user.username);
  // console.log(4, detail.author);

  useEffect(() => {
    getDetail();
  }, []);

  const delPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8888/user/post/${detail.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // body 데이터가 들어옴
        if (res.code === 1) {
          console.log("통신성공");
          // 화면 동기화 해야됨
          props.history.push("/");
        } else {
          console.log("통신 실패");
        }
      });
  };

  return (
    <Container>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {detail.id}. {detail.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {detail.created}
          </Card.Subtitle>
          <Card.Text>
            {detail.author} : {detail.content}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      {/* 삼항연산자로 로그인되어있고 id 일치하면 삭제, 수정버튼 나타내기 */}
      {isLogin === true && user.username === detail.author ? (
        <>
          <Link
            to={{
              pathname: `/post/update/${detail.id}`,
              state: { detail },
            }}
          >
            <Button>수정하기</Button>
          </Link>{" "}
          &nbsp;
          <Button onClick={delPost}>삭제하기</Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default DetailPage;
