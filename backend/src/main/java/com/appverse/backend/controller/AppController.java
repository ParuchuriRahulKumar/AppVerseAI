package com.appverse.backend.controller;

import com.appverse.backend.entity.App;

import com.appverse.backend.repository.AppRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/apps")



public class AppController {

    @Autowired
    private AppRepository appRepository;

    // =========================
    // ADD APP
    // =========================

    @PostMapping

    public App addApp(

            @RequestBody App app

    ) {

        return appRepository.save(app);
    }

    // =========================
    // GET ALL APPS
    // =========================

    @GetMapping

    public List<App> getAllApps() {

        return appRepository.findAll();
    }

    // =========================
    // SEARCH APPS
    // =========================

    @GetMapping("/search")

    public List<App> searchApps(

            @RequestParam String keyword

    ) {

        return appRepository
                .findByAppNameContainingIgnoreCase(
                        keyword
                );
    }

    // =========================
    // GET APP BY ID
    // =========================

    @GetMapping("/{id}")

    public App getAppById(

            @PathVariable Long id

    ) {

        return appRepository
                .findById(id)
                .orElse(null);
    }

    // =========================
    // DELETE APP
    // =========================

    @DeleteMapping("/{id}")

    public String deleteApp(

            @PathVariable Long id

    ) {

        appRepository.deleteById(id);

        return "App Deleted Successfully";
    }

    // =========================
    // DOWNLOAD TRACKING
    // =========================

    @PutMapping("/download/{id}")

    public App increaseDownload(

            @PathVariable Long id

    ) {

        App app =
                appRepository
                        .findById(id)
                        .orElse(null);

        if (app != null) {

            app.setDownloads(

                    app.getDownloads() + 1
            );

            return appRepository.save(app);
        }

        return null;
    }
}