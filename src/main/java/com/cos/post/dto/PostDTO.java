package com.cos.post.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
	
	private int id;
	private String title;
	private String content;
	private String author;
	private Date created;

}
