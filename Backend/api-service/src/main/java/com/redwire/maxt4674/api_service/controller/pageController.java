package com.redwire.maxt4674.api_service.controller;

import com.redwire.maxt4674.api_service.model.Page;
import com.redwire.maxt4674.api_service.repository.PageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pages")
public class pageController {

    private final PageRepository pageRepository;

    public pageController(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    @GetMapping
    public List<PageInfo> getPages() {
        return pageRepository.findAll()
            .stream()
            .map(p -> new PageInfo(p.getSlug(), p.getTitle()))
            .toList();
    }

    @GetMapping("/{slug}")
    public PageContent getPageContent(@PathVariable String slug) {
        Page page = pageRepository.findBySlug(slug);
        return new PageContent(slug, "This is the content for " + slug);
    }

    public record PageInfo(String slug, String title) {}
    public record PageContent(String slug, String content) {}
}
