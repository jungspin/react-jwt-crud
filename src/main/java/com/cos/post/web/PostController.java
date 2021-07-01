package com.cos.post.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import com.cos.post.dto.CMRespDTO;
import com.cos.post.dto.PostDTO;
import com.cos.post.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/")
public class PostController {

	@Autowired
	private PostService postService;

	HttpServletRequest req;
	HttpServletResponse resp;

	ObjectMapper ob = new ObjectMapper();

	// 게시글 전체보기
	@GetMapping("post")
	public ResponseEntity<?> list() throws IOException {

		List<PostDTO> posts = postService.list(); // 어차피 List 형태로 반환되니까
		/*
		 * System.out.println("findById 나 실행 됨?"); PostDTO post1 = new PostDTO(1,
		 * "ssar1", "ssar", "ssar", null); PostDTO post2 = new PostDTO(2, "ssar2",
		 * "ssar", "ssar", null); PostDTO post3 = new PostDTO(3, "ssar3", "ssar",
		 * "ssar", null);
		 * 
		 * List<PostDTO> users = Arrays.asList(post1, post2, post3);
		 */
		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK", posts), HttpStatus.OK);

	}

	// 게시글 상세보기
	@GetMapping("post/detail/{id}")
	public void findByNum(@PathVariable int id) throws IOException {

		PostDTO postEntity = postService.findByNum(id);
		// json 으로 바꿔서!!! 담아서!!! 보내!!!!
		CMRespDTO<PostDTO> cmRespDTO = new CMRespDTO<PostDTO>(1, "통신성공", postEntity);
		String postEntityJson = ob.writeValueAsString(cmRespDTO);

		resp.setContentType("application/json; charset=utf-8");
		PrintWriter out = resp.getWriter();
		out.print(postEntityJson); // CMRespDTO -> 응답을 오브젝트로 날려서 상태로 관리해바.....
		out.flush();
	}

	// 게시글 쓰기
	@PostMapping("post")
	public ResponseEntity<?> insert(@RequestBody PostDTO postDTO) throws IOException { // ob 쓸 필요 없겠지
		System.out.println("컨트롤러 탔당");
		System.out.println(postDTO);
		
		postDTO.setAuthor("홍길동");

		
		int result = postService.insert(postDTO);
		if (result != 1) {
			System.out.println(result);
			
		}
		
		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK"), HttpStatus.OK);

		/*
		 * CMRespDTO<PostDTO> cmRespDTO = new CMRespDTO<PostDTO>(1, "통신성공"); String
		 * cmRespDTOJson = ob.writeValueAsString(cmRespDTO);
		 * 
		 * resp.setContentType("application/json; charset=utf-8"); PrintWriter out =
		 * resp.getWriter(); out.print(cmRespDTOJson); // CMRespDTO -> 응답을 오브젝트로 날려서 상태로
		 * 관리해바..... out.flush();
		 */

	}

	// 게시글 수정화면 가기 -> 근데 나는 걍 상태 넘겨줄래 일단 만들자
	@GetMapping("post/{id}")
	public void updatePage(@PathVariable int id) throws IOException {
		PostDTO postEntity = postService.findByNum(id);
		// json 으로 바꿔서!!! 담아서!!! 보내!!!!
		CMRespDTO<PostDTO> cmRespDTO = new CMRespDTO<PostDTO>(1, "통신성공", postEntity);
		String postEntityJson = ob.writeValueAsString(cmRespDTO);

		resp.setContentType("application/json; charset=utf-8");
		PrintWriter out = resp.getWriter();
		out.print(postEntityJson); // CMRespDTO -> 응답을 오브젝트로 날려서 상태로 관리해바.....
		out.flush();

	}

	// 게시글 수정하기
	@PutMapping("post/{id}")
	public ResponseEntity<?> update(@PathVariable int id, @RequestBody PostDTO postDTO) throws IOException {
		System.out.println("update 컨트롤러 탔당");
		postDTO.setId(id);
		System.out.println(postDTO);
		
		int result = postService.update(postDTO);
		
		if (result != 1) {
			System.out.println(result);
		}
		// 수정하고 다시 화면에 뿌리려면 내가 데이터 줘야하나>? 주자 안줄래
		//PostDTO postEntity = postService.findByNum(id);
		
		
		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK"), HttpStatus.OK);

	}

	// 게시글 삭제하기
	@DeleteMapping("post/{id}")
	public ResponseEntity<?> delete(@PathVariable int id) throws IOException {

		int result = postService.delete(id);
		
		if (result != 1) {
			System.out.println(result);
		}
		
		return new ResponseEntity<>(new CMRespDTO<>(1, "find OK"), HttpStatus.OK);

	}

}
