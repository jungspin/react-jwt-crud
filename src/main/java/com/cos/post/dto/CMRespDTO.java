package com.cos.post.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CMRespDTO<T> {

	public CMRespDTO(int code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}

	private int code;
	private String msg;
	private T data;
}
