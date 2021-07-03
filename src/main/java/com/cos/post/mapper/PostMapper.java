package com.cos.post.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.cos.post.domain.post.Post;

@Mapper
public interface PostMapper {
	
	public int insert(Post post);
	
	public List<Post> list();
	
	public Post findByNum(int id);
	
	public int update(Post post);
	
	public int delete(int id);

}
