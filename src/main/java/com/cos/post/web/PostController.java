package com.cos.post.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.post.domain.post.Post;
import com.cos.post.service.PostService;
import com.cos.post.web.dto.CMRespDTO;

@RestController
@ResponseBody
public class PostController {

	@Autowired
	private PostService postService;

	HttpServletRequest req; HttpServletResponse resp;


	// 게시글 전체보기
	@GetMapping("/post")
	public ResponseEntity<?> list() throws IOException {
		System.out.println("전체보기 탔다");

		List<Post> posts = postService.list(); // 어차피 List 형태로 반환되니까
		
		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK", posts), HttpStatus.OK);

	}

	// 게시글 상세보기
	@GetMapping("/post/{id}")
	public ResponseEntity<?> findByNum(@PathVariable int id) throws IOException {
		System.out.println("상세보기 탔다");
		Post postEntity = postService.findByNum(id);

		//resp.setContentType("application/json; charset=utf-8");

		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK", postEntity), HttpStatus.OK);
	}

	

	// 게시글 수정화면 가기 -> 근데 나는 걍 상태 넘겨줄래 일단 만들자
	@GetMapping("/post/user/{id}")
	public ResponseEntity<?> updatePage(@PathVariable int id) throws IOException {
		Post postEntity = postService.findByNum(id);
		

		resp.setContentType("application/json; charset=utf-8");
		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK", postEntity), HttpStatus.OK);

	}

	

}
