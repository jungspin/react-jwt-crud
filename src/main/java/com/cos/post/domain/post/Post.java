package com.cos.post.domain.post;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
	private int id;
	private String title;
	private String content;
	private String author;
	private Date created;

}
