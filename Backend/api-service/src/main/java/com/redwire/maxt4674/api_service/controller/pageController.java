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
    public List<PageInfo> getPages(@RequestParam(required = false) String search) {
        List<Page> pages;
        
        if (search == null || search.isBlank()) {
            // If search is empty or null, return all pages
            pages = pageRepository.findAll();
        } else {
            // Otherwise, filter pages by title
            pages = pageRepository.findByTitleContainingIgnoreCase(search);
        }
    
        return pages.stream()
            .map(p -> new PageInfo(p.getSlug(), p.getTitle()))
            .toList();
    }

    @GetMapping("/{slug}")
    public PageContent getPageContent(@PathVariable String slug) {
        @SuppressWarnings("unused")
        Page page = pageRepository.findBySlug(slug);
        return new PageContent(slug, "This is the content for " + slug);
    }

    public record PageInfo(String slug, String title) {}
    public record PageContent(String slug, String content) {}
}
