package com.redwire.maxt4674.api_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pages")
public class pageController {
    @GetMapping
    public List<PageInfo> getPages() {
        return List.of(
            new PageInfo("Calc1", "About Us Calc"),
            new PageInfo("calc2", "Contact Calc"),
            new PageInfo("faqCalc", "FAQ Calc")
        );
    }

    @GetMapping("/{slug}")
    public PageContent getPageContent(@PathVariable String slug) {
        return new PageContent(slug, "This is the content for " + slug);
    }

    // Inner static classes, or put these in `model` package
    public record PageInfo(String slug, String title) {}
    public record PageContent(String slug, String content) {}
}
