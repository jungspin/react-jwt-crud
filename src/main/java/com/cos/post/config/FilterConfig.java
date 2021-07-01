package com.cos.post.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// 진짜 쓸거
// 스프링은 필터를 xml이 아닌 클래스로 만든다
@Configuration // 스프링에서 IoC 로 등록할 수 있는 방법 중 하나 (@Compoment 계열)
public class FilterConfig {
	// 필터 순서도 정할 수 있대
	
	@Bean
	public FilterRegistrationBean<CorsFilter> CorsFilter(){
		System.out.println("corsFilter 등록됨");
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter());
		bean.addUrlPatterns("/*");
		bean.setOrder(0); // 낮은 번호부터 실행이 됨
		return bean;
	}
	
	
}

