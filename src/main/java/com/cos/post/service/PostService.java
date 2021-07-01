package com.cos.post.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.post.dto.PostDTO;
import com.cos.post.mapper.PostMapper;


@Service
public class PostService {
	
	@Autowired
	private PostMapper postMapper;

	public int insert(PostDTO postDTO) {
		return postMapper.insert(postDTO);
	}

	public List<PostDTO> list(){
		return postMapper.list();
	}

	public PostDTO findByNum(int id) {
		return postMapper.findByNum(id);
	}

	public int update(PostDTO postDTO) {
		return postMapper.update(postDTO);
	}

	public int delete(int id) {
		return postMapper.delete(id);
	}

}
