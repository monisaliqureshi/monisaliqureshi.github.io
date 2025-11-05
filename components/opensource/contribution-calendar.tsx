"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { OpenSource } from "@/lib/types"

interface ContributionCalendarProps {
  data: OpenSource
  year?: number // optional: render a specific year
}

/* ---------- helpers ---------- */
function startOfCalendar(year: number) {
  const d = new Date(year, 0, 1) // Jan 1
  d.setDate(d.getDate() - d.getDay()) // back to Sunday
  d.setHours(0, 0, 0, 0)
  return d
}

function endOfCalendar(year: number) {
  const d = new Date(year, 11, 31) // Dec 31
  d.setDate(d.getDate() + (6 - d.getDay())) // forward to Saturday
  d.setHours(23, 59, 59, 999)
  return d
}

function generateContributionMatrix(year: number) {
  const start = startOfCalendar(year)
  const end = endOfCalendar(year)

  const weeks: number[][] = []
  const monthTicks: Array<{ weekIdx: number; label: string }> = []

  const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const cur = new Date(start)
  let week: number[] = []
  let weekIdx = 0

  while (cur <= end) {
    if (cur.getDate() === 1) {
      monthTicks.push({ weekIdx, label: monthsShort[cur.getMonth()] })
    }

    // mock/synthetic contributions (your earlier logic)
    const has = Math.random() > 0.3
    let val = 0
    if (has) {
      const r = Math.random()
      if (r < 0.5) val = Math.floor(Math.random() * 3) + 1 // 1–3
      else if (r < 0.8) val = Math.floor(Math.random() * 4) + 4 // 4–7
      else val = Math.floor(Math.random() * 8) + 8 // 8–15
    }

    week.push(val)
    cur.setDate(cur.getDate() + 1)

    if (week.length === 7) {
      weeks.push(week)
      week = []
      weekIdx++
    }
  }

  return { weeks, monthTicks, daysShort }
}

function getContributionColor(count: number, isDark: boolean) {
  if (count === 0) return isDark ? "bg-gray-800/50" : "bg-gray-100"
  if (count <= 3) return isDark ? "bg-green-900/60" : "bg-green-200"
  if (count <= 6) return isDark ? "bg-green-700/80" : "bg-green-400"
  if (count <= 9) return isDark ? "bg-green-600" : "bg-green-600"
  return isDark ? "bg-green-500" : "bg-green-700"
}

/* ---------- component ---------- */
export function ContributionCalendar({ data, year }: ContributionCalendarProps) {
  const y = year ?? new Date().getFullYear()
  const { weeks, monthTicks, daysShort } = generateContributionMatrix(y)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        {/* header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
            <Image src="/github-octocat-mascot.png" alt="GitHub Octocat" fill className="object-contain" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            GitHub Contributions
          </h2>
        </div>

        {/* === CENTERED CALENDAR AREA === */}
        <div className="w-full overflow-x-auto flex justify-center">
          {/* use w-fit so width hugs content; mx-auto centers */}
          <div className="inline-block w-fit mx-auto">
            {/* Month labels aligned to week columns.
                Day labels column uses w-8, so match with ml-8 */}
            <div
              className="relative mb-2 ml-8"
              style={{ display: "grid", gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1rem))` }}
            >
              {monthTicks.map((m) => (
                <div
                  key={`${m.label}-${m.weekIdx}`}
                  className="text-xs text-gray-600 dark:text-gray-400"
                  style={{ gridColumnStart: m.weekIdx + 1 }}
                >
                  {m.label}
                </div>
              ))}
            </div>

            {/* calendar grid */}
            <div className="flex gap-1">
              {/* Day labels (fixed width = 2rem / w-8). Keep opacity for every other row. */}
              <div className="flex flex-col gap-1 pr-2">
                {daysShort.map((day, idx) => (
                  <div
                    key={day}
                    className="text-xs text-gray-600 dark:text-gray-400 h-3 flex items-center justify-end w-8"
                    style={{ opacity: idx % 2 === 0 ? 1 : 0 }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Contribution squares */}
              <div className="flex gap-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((count, dIdx) => (
                      <motion.div
                        key={`${wIdx}-${dIdx}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: (wIdx * 7 + dIdx) * 0.0008, duration: 0.2 }}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(count, false)} dark:${getContributionColor(count, true)} hover:ring-2 hover:ring-green-500 transition-all cursor-pointer`}
                        title={`${count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend + count label */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 text-xs text-gray-600 dark:text-gray-400">
              <div className="font-semibold">
                {data.total_contributions.toLocaleString()} activities in {y}
              </div>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700" />
                  <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900/60" />
                  <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700/80" />
                  <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-600" />
                  <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-500" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {data.total_contributions.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Contributions</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Sep 7, 2022 - Present</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              {data.current_streak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Oct 17 - Present</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
            <div className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              {data.longest_streak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Jan 17 - Apr 15, {y}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
