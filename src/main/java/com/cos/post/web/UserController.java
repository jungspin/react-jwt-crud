package com.cos.post.web;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.post.domain.post.Post;
import com.cos.post.domain.user.User;
import com.cos.post.service.PostService;
import com.cos.post.service.UserService;
import com.cos.post.web.dto.CMRespDTO;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private HttpSession session;

	@Autowired
	private UserService userService;

	@Autowired
	private PostService postService;

	@GetMapping("/")
	public ResponseEntity<?> userinfo() {
		// 토큰 없으면 못 오게 할거야

		User principal = (User) session.getAttribute("principal");
		System.out.println("로그인 된 사용자 : " + principal);

		// 데이터 돌려주기
		User user = userService.findById(principal.getId()); // /** 하면 여기서 오류터짐
		user.setPassword(null);
		System.out.println("user 정보 : " + user);
		// User user = new User(1, "ssar", "null", "ssar@nate.com", "GUEST");
		return new ResponseEntity<>(new CMRespDTO<User>(1, "find OK", user), HttpStatus.OK);
	}

	// 게시글 쓰기
	@PostMapping("/post")
	public ResponseEntity<?> insert(@RequestBody Post post) { // ob 쓸 필요 없겠지
		System.out.println("글쓰기 컨트롤러 탔당");
		User principal = (User) session.getAttribute("principal");
		System.out.println("로그인 된 사용자 : " + principal);
		System.out.println(post);

		int result = postService.insert(post);
		if (result != 1) {
			System.out.println(result);

		}

		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK"), HttpStatus.OK);

	}

	// 게시글 수정하기
	@PutMapping("/post/{id}")
	public ResponseEntity<?> update(@PathVariable int id, @RequestBody Post post) throws IOException {
		System.out.println("update 컨트롤러 탔당");
		User principal = (User) session.getAttribute("principal");
		System.out.println("로그인 된 사용자 : " + principal);
		
		post.setId(id);
		System.out.println(post);

		int result = postService.update(post);

		if (result != 1) {
			System.out.println(result);
		}
		// 수정하고 다시 화면에 뿌리려면 내가 데이터 줘야하나>? 주자 안줄래
		// PostDTO postEntity = postService.findByNum(id);

		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK"), HttpStatus.OK);

	}

	// 게시글 삭제하기
	@DeleteMapping("/post/{id}")
	public ResponseEntity<?> delete(@PathVariable int id) throws IOException {
		System.out.println("delete 컨트롤러 탔당");
		User principal = (User) session.getAttribute("principal");
		System.out.println("로그인 된 사용자 : " + principal);

		int result = postService.delete(id);

		if (result != 1) {
			System.out.println(result);
		}

		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK"), HttpStatus.OK);

	}
}
