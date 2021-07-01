package com.cos.post.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.cos.post.dto.PostDTO;



@Mapper
public interface PostMapper {
	
	public int insert(PostDTO postDTO);
	
	public List<PostDTO> list();
	
	public PostDTO findByNum(int id);
	
	public int update(PostDTO postDTO);
	
	public int delete(int id);

}
