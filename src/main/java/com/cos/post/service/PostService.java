package com.cos.post.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.post.domain.post.Post;

import com.cos.post.mapper.PostMapper;


@Service
public class PostService {
	
	@Autowired
	private PostMapper postMapper;

	public int insert(Post post) {
		return postMapper.insert(post);
	}

	public List<Post> list(){
		return postMapper.list();
	}

	public Post findByNum(int id) {
		return postMapper.findByNum(id);
	}

	public int update(Post post) {
		return postMapper.update(post);
	}

	public int delete(int id) {
		return postMapper.delete(id);
	}

}
