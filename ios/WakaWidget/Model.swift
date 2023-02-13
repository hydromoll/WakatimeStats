//
//  Model.swift
//  WakatimeStats
//
//  Created by hydromoll on 13.02.2023.
//

import Foundation


// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse the JSON, add this file to your project and do:
//
//   let weekStats = try? JSONDecoder().decode(WeekStats.self, from: jsonData)

// MARK: - WeekStats
struct WeekStats: Codable {
    let data: DataClass
}

// MARK: - DataClass
struct DataClass: Codable {
    let bestDay: BestDay
    let categories: [Category]
    let createdAt: Date
    let dailyAverage, dailyAverageIncludingOtherLanguage, daysIncludingHolidays, daysMinusHolidays: Int
    let dependencies, editors: [Category]
    let end: Date
    let holidays: Int
    let humanReadableDailyAverage, humanReadableDailyAverageIncludingOtherLanguage, humanReadableRange, humanReadableTotal: String
    let humanReadableTotalIncludingOtherLanguage, id: String
    let isAlreadyUpdating, isCodingActivityVisible, isIncludingToday, isOtherUsageVisible: Bool
    let isStuck, isUpToDate, isUpToDatePendingFuture: Bool
    let languages, machines: [Category]
    let modifiedAt: Date
    let operatingSystems: [Category]
    let percentCalculated: Int
    let projects: [Category]
    let range: String
    let start: Date
    let status: String
    let timeout: Int
    let timezone: String
    let totalSeconds, totalSecondsIncludingOtherLanguage: Double
    let userID, username: String
    let writesOnly: Bool

    enum CodingKeys: String, CodingKey {
        case bestDay = "best_day"
        case categories
        case createdAt = "created_at"
        case dailyAverage = "daily_average"
        case dailyAverageIncludingOtherLanguage = "daily_average_including_other_language"
        case daysIncludingHolidays = "days_including_holidays"
        case daysMinusHolidays = "days_minus_holidays"
        case dependencies, editors, end, holidays
        case humanReadableDailyAverage = "human_readable_daily_average"
        case humanReadableDailyAverageIncludingOtherLanguage = "human_readable_daily_average_including_other_language"
        case humanReadableRange = "human_readable_range"
        case humanReadableTotal = "human_readable_total"
        case humanReadableTotalIncludingOtherLanguage = "human_readable_total_including_other_language"
        case id
        case isAlreadyUpdating = "is_already_updating"
        case isCodingActivityVisible = "is_coding_activity_visible"
        case isIncludingToday = "is_including_today"
        case isOtherUsageVisible = "is_other_usage_visible"
        case isStuck = "is_stuck"
        case isUpToDate = "is_up_to_date"
        case isUpToDatePendingFuture = "is_up_to_date_pending_future"
        case languages, machines
        case modifiedAt = "modified_at"
        case operatingSystems = "operating_systems"
        case percentCalculated = "percent_calculated"
        case projects, range, start, status, timeout, timezone
        case totalSeconds = "total_seconds"
        case totalSecondsIncludingOtherLanguage = "total_seconds_including_other_language"
        case userID = "user_id"
        case username
        case writesOnly = "writes_only"
    }
}

// MARK: - BestDay
struct BestDay: Codable {
    let createdAt: Date
    let date, id: String
    let modifiedAt: Date
    let text: String
    let totalSeconds: Double

    enum CodingKeys: String, CodingKey {
        case createdAt = "created_at"
        case date, id
        case modifiedAt = "modified_at"
        case text
        case totalSeconds = "total_seconds"
    }
}

// MARK: - Category
struct Category: Codable {
    let decimal, digital: String
    let hours, minutes: Int
    let name: String
    let percent: Double
    let text: String
    let totalSeconds: Double
    let machineNameID: String?

    enum CodingKeys: String, CodingKey {
        case decimal, digital, hours, minutes, name, percent, text
        case totalSeconds = "total_seconds"
        case machineNameID = "machine_name_id"
    }
}
