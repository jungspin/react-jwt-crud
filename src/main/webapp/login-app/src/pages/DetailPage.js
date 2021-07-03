import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DetailPage = (props) => {
  const { user } = useSelector((store) => store);
  const { isLogin } = useSelector((store) => store);

  //console.log(list);
  let info = props.location.state.list;
  //console.log(1, info);
  //console.log(2, info.id);

  const delPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8888/user/post/${info.id}`, {
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
          console.log("통신 성공");
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
            {info.id}. {info.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {info.created}
          </Card.Subtitle>
          <Card.Text>
            {info.author} : {info.content}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      {/* 삼항연산자로 로그인되어있고 id 일치하면 삭제, 수정버튼 나타내기 */}
      {isLogin === true && user.username === info.author ? (
        <>
          <Link
            to={{
              pathname: `/post/update/${info.id}`,
              state: { info },
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
